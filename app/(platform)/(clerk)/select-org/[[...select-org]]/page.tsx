import { OrganizationList } from '@clerk/nextjs';

export default function CreateOrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organizarion/:id"
    />
  );
}
