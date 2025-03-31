import SpinnerCircle from "../components/ui/spinner/spinner";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerCircle />
      </div>
    </>
  );
}
