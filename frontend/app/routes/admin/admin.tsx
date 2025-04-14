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

interface DepartmentData {
  _id?: string;
  title: string;
  description: string;
  image: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_title: string;
}

export default function Admin() {
  const [departments, setDepartments] = useState<DepartmentData[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:6900/api/department");
        const data = await response.json();
        setDepartments(data.department || []);
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
                      value={department.title}
                    />
                    <input
                      placeholder="Description"
                      name="description"
                      type="textarea"
                      value={department.description}
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
                      value={department.contact_person_name}
                    />
                    <input
                      placeholder="Contact Email"
                      name="contact_person_email"
                      type="email"
                      value={department.contact_person_email}
                    />
                    <input
                      placeholder="Contact Title"
                      name="contact_person_title"
                      type="text"
                      value={department.contact_person_title}
                    />
                    <Button type="submit">Update Department</Button>
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
                  <input
                    placeholder="Title"
                    name="title"
                    type="test"
                    
                  />
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
    </div>
  );
}