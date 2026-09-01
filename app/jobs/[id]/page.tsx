import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { JobDetailView } from "@/components/jobs/job-detail-view";

export const metadata = {
  title: "جزئیات آگهی — جاب‌گراف",
};

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <JobDetailView id={id} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
