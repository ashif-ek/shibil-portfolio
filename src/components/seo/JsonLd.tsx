import type { Thing, WithContext } from "schema-dts";

export default function JsonLd<T extends Thing>({ schema }: { schema: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
