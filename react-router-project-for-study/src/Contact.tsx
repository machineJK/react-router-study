import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { ContactProps, RequestType } from "./allType";
import { getContact, updateContact } from "./contact";

export async function loader(parameters: RequestType) {
  const contact = await getContact(parameters.params.contactId);
  return { contact };
}

export async function action(parameters: RequestType) {
  let formData = await parameters.request.formData();
  return updateContact(parameters.params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact(): JSX.Element {
  const { contact } = useLoaderData() as ContactProps;

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || undefined} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: ContactProps): JSX.Element {
  const fetcher = useFetcher();
  let favorite = contact.favorite;
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
