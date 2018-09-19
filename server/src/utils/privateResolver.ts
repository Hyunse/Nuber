/**
 * Private Resolver
 * 
 * @desc Check Json Web Token Before 
 */
const privateResolver = (resolverFunction) => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error('No jwt. I refuse to proceed');
  }

  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
};

export default privateResolver;
