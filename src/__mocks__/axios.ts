const mockAxios = jest.genMockFromModule('axios') as {
  create: { mockReturnThis: Function };
  get: {
    mockResolvedValue: Function;
    mockImplementationOnce: Function;
  };
}

mockAxios.create.mockReturnThis()

export default mockAxios
