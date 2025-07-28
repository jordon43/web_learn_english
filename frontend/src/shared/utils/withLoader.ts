export const withLoader = (o: any) => ({
  ...o,
  meta: { ...(o.meta ?? {}), globalLoader: true },
});
