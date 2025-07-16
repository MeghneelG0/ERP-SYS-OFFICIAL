import FormBuilder from "@/components/formbuilder/form-builder";
import { notFound } from "next/navigation";
import React from "react";

interface EditFormPageProps {
  params: Promise<{ id: string }>;
}

async function fetchFormById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ""}/api/kpi/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

function EditFormClient({ form }: { form: any }) {
  if (!form) return <p>Error</p>;
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Edit Form</h1>
      <p className="bg-secondary mb-8">
        Make changes to your form and save when you're done.
      </p>
      <FormBuilder initialForm={form} />
    </main>
  );
}

export default async function EditFormPage({ params }: EditFormPageProps) {
  const { id } = await params;
  const data = await fetchFormById(id);
  const form = data?.form || data?.kpi || null;
  if (!form) notFound();
  return <EditFormClient form={form} />;
}
