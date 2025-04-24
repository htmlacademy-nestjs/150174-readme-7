export interface RequestWithLogout {
  logout: (cb: Function) => Promise<void>;
}
