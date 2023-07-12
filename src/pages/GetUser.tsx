import { json, useRouteLoaderData } from "react-router-dom";

interface MyAccountInterface {
  u_id: string;
}

const GetUser = () => {
  const data: MyAccountInterface = useRouteLoaderData(
    "users-accounts"
  ) as MyAccountInterface;

  return (
    <>
      <h1 style={{ padding: "155px" }}>My Account</h1>
      <h1>{data?.u_id}</h1>
    </>
  );
};
export default GetUser;

export async function loader({
  request,
  params,
}: {
  request: any;
  params: any;
}) {
  const uid = params.uid;

  const response = await fetch(`http://localhost:3000/${uid}`);

  if (!response.ok) {
    return json({ message: "Could not fetch classes." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}
