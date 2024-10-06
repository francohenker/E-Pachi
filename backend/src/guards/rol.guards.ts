import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { User } from 'src/user/entities/user.entity';
  import { Roles } from 'src/enums/roles.enum';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
        
      const roles = this.reflector.get<Roles[]>('roles', context.getHandler());
      if (!roles) {
        return true; // Permitir el acceso si no se especifican roles
      }
  
      const request = context.switchToHttp().getRequest();
      const user: User = request.user; // Obtener el usuario autenticado (asegúrate de tener un sistema de autenticación implementado)
  
      const hasRole = () => user.rol && roles.includes(user.rol);
      if (!user || !hasRole()) {
        throw new ForbiddenException('No tienes permisos para acceder a este recurso');
      }
      return true;
    }
  }