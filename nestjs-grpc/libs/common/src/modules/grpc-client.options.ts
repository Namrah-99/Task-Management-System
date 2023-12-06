// import { Transport, ClientOptions } from '@nestjs/microservices';
// import { join } from 'path';

// interface GrpcClientConfig {
//   service: string;
//   protoPath: string;
//   package: string;
//   url: string
// }

// export const grpcClientOptions = (config: GrpcClientConfig): ClientOptions => {
//   return {
//     transport: Transport.GRPC,
//     options: {
//       url: config.url,
//       package: config.package,
//       protoPath: join(__dirname, config.protoPath),
//     },
//   };
// };
import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export function createGrpcClientOptions(urlStr: string, packageName: string, protoPath: string): ClientOptions {
  return {
    transport: Transport.GRPC,
    options: {
      url: urlStr,
      package: packageName,
      protoPath: join(__dirname, `../${protoPath}`),
    },
  };
}
