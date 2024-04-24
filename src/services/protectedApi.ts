import configuration from '../configuration';

export const protectedApi = {
  async getData(accessToken: string) {
    try {
      const response = await fetch(
        `${configuration.protectedApiUrl}/authorized`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.log(error)
    }
  },
};
