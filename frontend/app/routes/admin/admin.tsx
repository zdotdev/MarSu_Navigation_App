import { useEffect, useState } from "react";
import Card from "~/components/custom/card/card";
import { convertImageToBase64 } from "~/lib/helpers/convert_to_text";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface DepartmentData {
  _id?: string;
  title: string;
  description: string;
  image: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_title: string;
}
interface LocationData {
  _id?: string;
  location_name: string;
  latitude: string;
  longtitude: string;
}

export default function Admin() {
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [locations, setLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentResponse = await fetch(
          "http://localhost:6900/api/department"
        );
        const locationResponse = await fetch(
          "http://localhost:6900/api/location"
        );
        const departmentData = await departmentResponse.json();
        const locationData = await locationResponse.json();

        setDepartments(departmentData.department || []);
        setLocations(locationData.location || []);
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const intent = formData.get("_action") as string;
    const id = formData.get("id") as string;

    const file = formData.get("image") as File;
    const imageBase64 =
      file && file.size > 0 ? await convertImageToBase64(file) : null;

    const payload: DepartmentData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: imageBase64 || "",
      contact_person_name: formData.get("contact_person_name") as string,
      contact_person_email: formData.get("contact_person_email") as string,
      contact_person_title: formData.get("contact_person_title") as string,
    };

    try {
      let url = "http://localhost:6900/api/department";
      let method = "POST";

      if (intent === "update") {
        url += `/${id}`;
        method = "PUT";
      } else if (intent === "delete") {
        url += `/${id}`;
        method = "DELETE";
      }

      const options: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" },
      };

      if (intent !== "delete") {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Failed operation");

      alert("Success!");
      window.location.reload();
    } catch (err) {
      alert(`Error during ${intent}`);
    }
  };

  const handleSubmitLocation = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const intent = formData.get("_action") as string;
    const id = formData.get("id") as string;

    const payload: LocationData = {
      location_name: formData.get("location_name") as string,
      latitude: formData.get("latitude") as string,
      longtitude: formData.get("longtitude") as string,
    };

    try {
      let url = "http://localhost:6900/api/location";
      let method = "POST";

      if (intent === "update") {
        url += `/${id}`;
        method = "PUT";
      } else if (intent === "delete") {
        url += `/${id}`;
        method = "DELETE";
      }

      const options: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" },
      };

      if (intent !== "delete") {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Failed operation");

      alert("Success!");
      window.location.reload();
    } catch (err) {
      alert(`Error during ${intent}`);
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {departments.map((department) => (
          <Dialog key={department._id}>
            <DialogTrigger asChild>
              <div>
                <Card img={department.image} title={department.title} />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Department</DialogTitle>
                <DialogDescription>
                  <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                    <input type="hidden" name="_action" value="update" />
                    <input type="hidden" name="id" value={department._id} />
                    <input
                      placeholder="Title"
                      name="title"
                      type="test"
                      defaultValue={department.title}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <input
                      placeholder="Description"
                      name="description"
                      type="textarea"
                      defaultValue={department.description}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <input
                      placeholder="Image"
                      type="file"
                      name="image"
                      accept="image/*"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <input
                      placeholder="Contact Name"
                      name="contact_person_name"
                      type="text"
                      defaultValue={department.contact_person_name}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <input
                      placeholder="Contact Email"
                      name="contact_person_email"
                      type="email"
                      defaultValue={department.contact_person_email}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <input
                      placeholder="Contact Title"
                      name="contact_person_title"
                      type="text"
                      defaultValue={department.contact_person_title}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <div className="w-fit">
                      <Button type="submit" className="w-full">
                        Update Department
                      </Button>
                    </div>
                  </form>
                  <form onSubmit={handleSubmit} className="pt-2">
                    <input type="hidden" name="_action" value="delete" />
                    <input type="hidden" name="id" value={department._id} />
                    <Button type="submit" variant="destructive">
                      Delete
                    </Button>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <Dialog>
          <DialogTrigger>
            <Button>Add Department</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Department</DialogTitle>
              <DialogDescription>
                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                  <input type="hidden" name="_action" value="update" />
                  <input type="hidden" name="id" />
                  <input placeholder="Title" name="title" type="test" />
                  <input
                    placeholder="Description"
                    name="description"
                    type="textarea"
                  />
                  <input
                    placeholder="Image"
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <input
                    placeholder="Contact Name"
                    name="contact_person_name"
                    type="text"
                  />
                  <input
                    placeholder="Contact Email"
                    name="contact_person_email"
                    type="email"
                  />
                  <input
                    placeholder="Contact Title"
                    name="contact_person_title"
                    type="text"
                  />
                  <Button type="submit">Add Department</Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="pt-8">
        <p>Locations</p>
        <Table>
          <TableCaption>A list of Locations.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Location name</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead>Longtitude</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location._id}>
                <TableCell className="font-medium">
                  {location.location_name}
                </TableCell>
                <TableCell>{location.latitude}</TableCell>
                <TableCell>{location.longtitude}</TableCell>
                <TableCell className="flex gap-2 items-center">
                  <Dialog key={location._id}>
                    <DialogTrigger asChild>
                      <Button>Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Location</DialogTitle>
                        <DialogDescription>
                          <form
                            className="space-y-4 mt-4"
                            onSubmit={handleSubmitLocation}
                          >
                            <input
                              type="hidden"
                              name="_action"
                              value="update"
                            />
                            <input
                              type="hidden"
                              name="id"
                              value={location._id}
                            />
                            <input
                              placeholder="Location name"
                              name="location_name"
                              type="text"
                              defaultValue={location.location_name}
                              className="w-full px-3 py-2 border rounded-md"
                            />
                            <input
                              placeholder="Latitude"
                              name="latitude"
                              type="text"
                              defaultValue={location.latitude}
                              className="w-full px-3 py-2 border rounded-md"
                            />
                            <input
                              placeholder="Longtitude"
                              name="longtitude"
                              type="text"
                              defaultValue={location.longtitude}
                              className="w-full px-3 py-2 border rounded-md"
                            />
                            <div className="w-fit">
                              <Button type="submit" className="w-full">
                                Update Location
                              </Button>
                            </div>
                          </form>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <form onSubmit={handleSubmitLocation}>
                    <input type="hidden" name="_action" value="delete" />
                    <input type="hidden" name="id" value={location._id} />
                    <Button type="submit" variant="destructive">
                      Delete
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog>
          <DialogTrigger>
            <Button>Add Location</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Location</DialogTitle>
              <DialogDescription>
                <form
                  className="space-y-4 mt-4"
                  onSubmit={handleSubmitLocation}
                >
                  <input type="hidden" name="_action" value="" />
                  <input
                    placeholder="Location name"
                    name="location_name"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <input
                    placeholder="Latitude"
                    name="latitude"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <input
                    placeholder="Longtitude"
                    name="longtitude"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <div className="w-fit">
                    <Button type="submit" className="w-full">
                      Save Location
                    </Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
