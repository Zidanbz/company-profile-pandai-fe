import { WebsiteContentEditor } from "@/components/admin/WebsiteContentEditor";
import { contentGroups } from "@/lib/content/catalog";
export default function Page({
  searchParams,
}: {
  searchParams: { section?: string };
}) {
  const group =
    searchParams.section && Object.hasOwn(contentGroups, searchParams.section)
      ? searchParams.section
      : undefined;
  return <WebsiteContentEditor initialGroup={group} />;
}
