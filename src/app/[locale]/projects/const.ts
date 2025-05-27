type TProject = {
  titleKey: string;
  roleKey: string;
  dateKey: string;
  detailsKey: string;
  projectId: string;
};

const projects: TProject[] = [
  {
    titleKey: 'b2bCommerce.title',
    roleKey: 'b2bCommerce.role',
    dateKey: 'b2bCommerce.date',
    detailsKey: 'b2bCommerce.type',
    projectId: 'b2bCommerce',
  },
  {
    titleKey: 'wrappedPunks.title',
    roleKey: 'wrappedPunks.role',
    dateKey: 'wrappedPunks.date',
    detailsKey: 'wrappedPunks.type',
    projectId: 'wrappedPunks',
  },
  {
    titleKey: 'ozu.title',
    roleKey: 'ozu.role',
    dateKey: 'ozu.date',
    detailsKey: 'ozu.type',
    projectId: 'ozu',
  },
];

export { projects };

export type { TProject };
