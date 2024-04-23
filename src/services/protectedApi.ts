import configuration from '../configuration';

export const protectedApi = {
  async getMessages(accessToken: string) {
    const response = await fetch(
      `${configuration.protectedApiUrl}/authorized`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.json();
  },
};
