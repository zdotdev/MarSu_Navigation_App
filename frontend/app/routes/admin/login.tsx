import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const intent = formData.get("_action") as string;

  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    let url = "http://localhost:6900/api/user/signin";
    let method = "POST";

    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, options);
    console.log(response, payload);

    if (!response.ok) return alert("Failed to login");

    alert("Success!");
    window.location.href = "dashboard";
  } catch (err) {
    alert(`Error during ${intent}`);
  }
};

export default function Login() {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <Card className="w-[400px] shadow-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold text-center">
              Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="" className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input type="hidden" name="_action" value="login" />
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
