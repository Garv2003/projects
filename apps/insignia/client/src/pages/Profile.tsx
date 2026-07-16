import { Header, SideNav } from "../components/custom";
import { useQuery, gql } from "@apollo/client";
import { useUserStore } from "@/store/user";
import { Button } from "@/components/ui/button";
import { DownLoad } from "@/utils";

const GET_LOGOS = gql`
  query {
    logos {
      title
      image
    }
  }
`;

const Profile = () => {
  const { data, loading, error } = useQuery(GET_LOGOS);
  const user = useUserStore((state) => state.user);

  return (
    <div className="relative">
      <Header />
      <div className="w-64 fixed pt-2">
        <SideNav />
      </div>
      <div className="ml-64 grid grid-cols-1 md:grid-cols-6 p-2 min-h-[92vh]">
        <div className="md:col-span-2 border shadow-sm bg-white dark:bg-gray-800 rounded-lg text-center flex flex-col justify-center items-center">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-lg text-gray-500">User information</p>
          </div>
          <div className="p-4">
            <p className="text-lg text-gray-500">Name</p>
            <p className="text-2xl">{user?.name}</p>
          </div>
          <div className="p-4">
            <p className="text-lg text-gray-500">Email</p>
            <p className="text-2xl">{user?.email}</p>
          </div>
        </div>
        <div className="md:col-span-4 items-center justify-center flex flex-col border shadow-sm ml-2 rounded-lg">
          {loading && (
            <div className="relative flex items-center justify-center">
              <div className="absolute flex items-center justify-center blur-sm"></div>
              <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-gray-900 z-10"></div>
            </div>
          )}
          {error && <p>Error</p>}
          {data && (
            <div className="flex flex-wrap items-center justify-center p-4 gap-4">
              {data.logos.map(
                (logo: { title: string; image: string }, index: number) => (
                  <div
                    key={index}
                    className="border shadow-sm bg-white dark:bg-gray-800 rounded-lg p-2 text-center "
                  >
                    <img
                      src={logo.image}
                      alt={logo.title}
                      className="h-[300px] w-[300px] mx-auto"
                    />
                    <Button onClick={() => DownLoad(logo.image)}>
                      Download
                    </Button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
