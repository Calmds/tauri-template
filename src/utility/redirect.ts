import { useEffect } from "react";
import { useLocation, useNavigate, redirect, useParams, generatePath } from "react-router-dom";

export const redirect1 = (path: string) => {
    const navigate = useNavigate();
    navigate(path);
}

export const redirect2 = (path: string) => redirect(path);

export const redirect3 = (path: string) => {
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    useEffect(() => { navigate(generatePath(path, params), { replace: true }) }, [navigate, location.pathname])
    return;
}