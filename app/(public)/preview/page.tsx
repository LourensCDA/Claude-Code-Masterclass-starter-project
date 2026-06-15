// preview page for newly created UI components

import Skeleton from "@/components/Skeleton";
import Avatar from "@/components/Avatar";

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>
      <Skeleton />
      <Skeleton />

      <h3>Avatar</h3>
      <div className="flex gap-2">
        <Avatar name="alice" />
        <Avatar name="JohnDoe" />
        <Avatar name="Bob" />
      </div>
    </div>
  );
}
