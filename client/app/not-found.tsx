import { Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-500">
        Oops! The page you are looking for doesn't exist.{" "}
        <Link href={"/"}>
          <span style={{ cursor: "pointer", color: "red", fontSize: "16px" }}>
            Visit Home
          </span>
        </Link>
      </p>
    </div>
  );
}
