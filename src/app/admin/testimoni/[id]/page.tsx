import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditTestimonialForm from "./EditTestimonialForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTestimoniPage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);

  const testimonial = await prisma.testimonial.findUnique({
    where: { id },
  });

  if (!testimonial) {
    notFound();
  }

  return <EditTestimonialForm testimonial={testimonial} />;
}