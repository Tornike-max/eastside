import { Spinner } from "@nextui-org/react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center mt-40">
      <Spinner color="secondary" size="lg" />
    </div>
  );
}
