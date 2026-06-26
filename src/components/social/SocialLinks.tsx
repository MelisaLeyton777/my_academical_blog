import { Space, Tooltip } from "antd";
import { GithubOutlined, MailOutlined } from "@ant-design/icons";

const iconStyle: React.CSSProperties = {
  fontSize: 24,
  color: "var(--color-text-secondary)",
  transition: "color 0.2s",
};

const linkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: "var(--color-border-secondary)",
  transition: "background 0.2s",
};

export default function SocialLinks() {
  return (
    <Space size="middle">
      <Tooltip title="GitHub">
        <a
          href="https://github.com/nacca-sudo"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          className="social-link"
        >
          <GithubOutlined style={iconStyle} />
        </a>
      </Tooltip>
      <Tooltip title="Email">
        <a href="mailto:narayc@uc.cl" style={linkStyle} className="social-link">
          <MailOutlined style={iconStyle} />
        </a>
      </Tooltip>
      <Tooltip title="ORCID">
        <a
          href="https://orcid.org/0009-0007-4560-7286"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          className="social-link"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="var(--color-text-secondary)"
            style={{ display: "block" }}
          >
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947-.947-.431-.947-.947.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-3.903-3.722h-2.416z" />
          </svg>
        </a>
      </Tooltip>
      <Tooltip title="LinkedIn">
        <a
          href="https://linkedin.com/in/nicolas-araya-caro"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          className="social-link"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="var(--color-text-secondary)"
            style={{ display: "block" }}
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </Tooltip>
      <Tooltip title="Google Scholar">
        <a
          href="https://scholar.google.com/citations?hl=es&user=2H_rhNUAAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          className="social-link"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="var(--color-text-secondary)"
            style={{ display: "block" }}
          >
            <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
          </svg>
        </a>
      </Tooltip>
    </Space>
  );
}
