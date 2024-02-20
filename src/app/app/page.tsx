import { GetCurrentUser } from "@/actions/user";
import Redirect from "@/components/global/Redirect";

const page = async () => {
  const user = await GetCurrentUser();
  if (!user) return <Redirect where="/auth" />;
  return (
    <div className="w-full h-full">
      <Redirect where={`/app/${user.id}/dashboard`} />
    </div>
  );
};

export default page;
