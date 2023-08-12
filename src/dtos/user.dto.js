class UserDto {
  constructor(session) {
    this.name = session.firstName || '';
    this.email = session.email || '';
    this.rol = session.rol || '';
  }
}

export { UserDto };
