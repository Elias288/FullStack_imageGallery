const DOS_SEMANAS = '336h';

export const jwtConstant = {
  global: true,
  secret: `${process.env.SECRET}`,
  signOptions: { expiresIn: DOS_SEMANAS },
};
