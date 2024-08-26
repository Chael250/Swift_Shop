import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService){}

  @Public()
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() authValidate:AuthDto){
    this.authService.signInLocal(authValidate)
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() id:number){
    this.authService.logout(id)
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@GetCurrentUserId() id:number, @GetCurrentUser("refreshToken") rt:string){
    this.authService.refreshToken(id, rt)
  }
}
