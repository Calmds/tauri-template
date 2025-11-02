use std::error::Error;
use std::fmt;
use std::future::Future;
use std::io::ErrorKind::Other;
use std::pin::Pin;
use std::task::{Context, Poll};

pub struct FrameworkError {
    message: String,
    source: Option<Box<dyn Error + Send + Sync>>,
    location: Option<&'static std::panic::Location<'static>>,
}

impl FrameworkError {
    #[track_caller]
    pub fn new(message: impl Into<String>) -> Self {
        FrameworkError {
            message: message.into(),
            source: None,
            location: Some(std::panic::Location::caller()),
        }
    }

    #[track_caller]
    pub fn with_source<E: Error + Send + Sync + 'static>(message: impl Into<String>, source: E) -> Self {
        FrameworkError {
            message: message.into(),
            source: Some(Box::new(source)),
            location: Some(std::panic::Location::caller()),
        }
    }
}

impl fmt::Debug for FrameworkError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut message = self.message.to_string();

        if let Some(loc) = self.location {
            message.push_str(&format!(" Location {}:{}:{}", loc.file(), loc.line(), loc.column()));
        }

        if let Some(source) = &self.source {
            message.push_str(&format!(" Caused by {source:?}"));
        }

        writeln!(f, "{message}")
    }
}

/// let e: FrameworkError = "".into();
impl<E: ToString> From<E> for FrameworkError {
    #[track_caller]
    fn from(e: E) -> Self {
        FrameworkError::new(e.to_string())
    }
}

//这几个impl是为了把我们的错误类型转化为其他，使用？可以把我们的错误类传转成其他
impl From<FrameworkError> for Box<dyn std::error::Error> {
    #[track_caller]
    fn from(value: FrameworkError) -> Self {
        Box::new(std::io::Error::new(Other, value.message))
    }
}

impl From<FrameworkError> for Box<dyn std::error::Error + Sync> {
    #[track_caller]
    fn from(value: FrameworkError) -> Self {
        Box::new(std::io::Error::new(Other, value.message))
    }
}

impl From<FrameworkError> for Box<dyn std::error::Error + Sync + Unpin> {
    #[track_caller]
    fn from(value: FrameworkError) -> Self {
        Box::new(std::io::Error::new(Other, value.message))
    }
}

// 这里主要是为了我们定义的错误类型可以在异步中传递
// Future impl: lets you use FrameworkError in async context as a completed future
impl Future for FrameworkError {
    type Output = String;

    #[track_caller]
    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<Self::Output> {
        Poll::Ready(self.message.clone())
    }
}

// we must manually implement serde::Serialize
impl serde::Serialize for FrameworkError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.message.as_ref())
    }
}

unsafe impl Send for FrameworkError {}
unsafe impl Sync for FrameworkError {}
