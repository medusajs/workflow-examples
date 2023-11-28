import { Customer } from "@medusajs/medusa";

export type SyncAudiencesWorkflowData = Omit<Customer, "beforeInsert"> & {
  audienceName: string;
};

export type GoogleAudienceData = {
  audienceName: string;
  id: string;
  emailAddress: string;
};

export type MailchimpAudienceData = {
  audienceName: string;
  id: string;
  email_address: string;
  status: string;
  merge_fields: {
    FNAME: string;
    LNAME: string;
  };
};

export type MetaAudienceData = {
  audienceName: string;
  email: string;
};
