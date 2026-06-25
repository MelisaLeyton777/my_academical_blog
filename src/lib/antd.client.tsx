"use client";

import React from "react";
import { Typography as AntTypography } from "antd";
import type { TitleProps } from "antd/es/typography/Title";
import type { ParagraphProps } from "antd/es/typography/Paragraph";
import type { TextProps } from "antd/es/typography/Text";

export const Title = React.forwardRef<HTMLElement, TitleProps & React.RefAttributes<HTMLElement>>(
  (props, ref) => <AntTypography.Title ref={ref} {...props} />,
);

export const Paragraph = React.forwardRef<HTMLElement, ParagraphProps & React.RefAttributes<HTMLElement>>(
  (props, ref) => <AntTypography.Paragraph ref={ref} {...props} />,
);

export const Text = React.forwardRef<HTMLElement, TextProps & React.RefAttributes<HTMLElement>>(
  (props, ref) => <AntTypography.Text ref={ref} {...props} />,
);
