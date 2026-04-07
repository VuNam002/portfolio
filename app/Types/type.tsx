import React from "react";

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  color: string;
  icon: React.ReactNode;
  github?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  desc: string;
  images: string[];
  color: string;
}