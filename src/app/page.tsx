import UploadForm from "@/components/form/upload-form";
import Header from "@/layout/header";

export default function Home() {
  return (
    <div className="p-4">
      <Header />
      <main className="mt-4">
        <div className="flex justify-center">
          <UploadForm />
        </div>
      </main>
    </div>
  );
}
