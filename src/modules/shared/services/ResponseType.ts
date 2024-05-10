export default interface TypeOfResponse {
  message?: string;
  status?: any;
  error?: any; // Error property is optional and of type FetchBaseQueryError or SerializedError
  data?: any; // Data property is optional and of type Store
}
