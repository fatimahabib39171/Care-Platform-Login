import { v4 as uuidv4 } from "uuid";

export const generateOrgID = (name: string) => {
  const organizationName = name.replace(/\s+/g, "");
  const guid = uuidv4();

  const base64Guid = btoa(guid);

  return `${organizationName}${base64Guid}`;
};