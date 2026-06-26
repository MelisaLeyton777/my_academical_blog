"use client";

import { Typography, List, Card, Tag, Empty, theme } from "antd";
import {
  ExperimentOutlined,
  FileTextOutlined,
  CalendarOutlined,
  LinkOutlined,
  BookOutlined,
} from "@ant-design/icons";
import type { BibEntry } from "@/lib/bibtex";

const { Title, Paragraph, Text } = Typography;

const typeConfig: Record<
  string,
  { color: string; icon: React.ReactNode; label: string }
> = {
  article: {
    color: "blue",
    icon: <FileTextOutlined />,
    label: "Journal Article",
  },
  inproceedings: {
    color: "green",
    icon: <BookOutlined />,
    label: "Conference Paper",
  },
  book: {
    color: "orange",
    icon: <BookOutlined />,
    label: "Book",
  },
  phdthesis: {
    color: "purple",
    icon: <ExperimentOutlined />,
    label: "PhD Thesis",
  },
};

export default function PublicationsContent({
  title,
  description,
  publications,
}: {
  title: string;
  description: string;
  publications: BibEntry[];
}) {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        flex: 1,
        padding: `${token.paddingXL}px ${token.paddingLG}px`,
        maxWidth: 960,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Title level={2}>{title}</Title>
      <Paragraph
        type="secondary"
        style={{
          fontSize: token.fontSizeLG,
          marginBottom: token.marginXL,
        }}
      >
        {description}
      </Paragraph>

      {publications.length === 0 ? (
        <Card>
          <Empty
            description="No publications yet. Add a .bib file at src/content/publications.bib"
          />
        </Card>
      ) : (
        <List
          dataSource={publications}
          renderItem={(pub) => {
            const cfg = typeConfig[pub.type] ?? {
              color: "default",
              icon: <FileTextOutlined />,
              label: pub.type,
            };

            return (
              <List.Item>
                <Card
                  style={{ width: "100%" }}
                  styles={{
                    body: {
                      padding: token.paddingLG,
                      display: "flex",
                      flexDirection: "column",
                      gap: token.paddingSM,
                    },
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: token.paddingXS,
                      flexWrap: "wrap",
                    }}
                  >
                    <Tag icon={cfg.icon} color={cfg.color}>
                      {cfg.label}
                    </Tag>
                    {pub.year && (
                      <Tag icon={<CalendarOutlined />} color="default">
                        {pub.year}
                      </Tag>
                    )}
                  </div>

                  <Title level={5} style={{ margin: 0 }}>
                    {pub.title}
                  </Title>

                  <Text type="secondary">{pub.author}</Text>

                  <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                    {pub.journal ?? pub.booktitle ?? pub.publisher}
                    {pub.volume ? `, ${pub.volume}` : ""}
                    {pub.number ? `(${pub.number})` : ""}
                    {pub.pages ? `, pp. ${pub.pages}` : ""}
                  </Text>

                  <div
                    style={{
                      display: "flex",
                      gap: token.paddingSM,
                      marginTop: token.paddingXS,
                    }}
                  >
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Tag
                          icon={<LinkOutlined />}
                          color="cyan"
                          style={{ cursor: "pointer" }}
                        >
                          DOI
                        </Tag>
                      </a>
                    )}
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Tag
                          icon={<LinkOutlined />}
                          color="geekblue"
                          style={{ cursor: "pointer" }}
                        >
                          PDF
                        </Tag>
                      </a>
                    )}
                  </div>
                </Card>
              </List.Item>
            );
          }}
        />
      )}
    </div>
  );
}
