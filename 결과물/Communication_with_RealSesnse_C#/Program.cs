
using Intel.RealSense;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Communication_With_Processing_Sketch
{
    class Program
    {
        static void Main(string[] args)
        {
            TcpListener listener = new TcpListener(IPAddress.Any, 5204);
            listener.Start();
            TcpClient cli;
            NetworkStream netStream;
            cli = listener.AcceptTcpClient();
            netStream = cli.GetStream();


            FrameQueue q = new FrameQueue();

            using (var ctx = new Context())
            {
                var devices = ctx.QueryDevices();

                Console.WriteLine("There are " + devices.Count + " connected RealSense devices.");
                if (devices.Count == 0) return;
                var dev = devices[0];

                Console.WriteLine("\nUsing device 0, an {0}", dev.Info[CameraInfo.Name]);
                Console.WriteLine("    Serial number: {0}", dev.Info[CameraInfo.SerialNumber]);
                Console.WriteLine("    Firmware version: {0}", dev.Info[CameraInfo.FirmwareVersion]);

                var depthSensor = dev.Sensors[0];

                var sp = depthSensor.VideoStreamProfiles
                                    .Where(p => p.Stream == Stream.Depth)
                                    .OrderByDescending(p => p.Framerate)
                                    .Where(p => p.Width == 640 && p.Height == 480)
                                    .First();
                depthSensor.Open(sp);
                depthSensor.Start(q);

                int one_meter = (int)(1f / depthSensor.DepthScale);

                var run = true;
                Console.CancelKeyPress += (s, e) =>
                {
                    e.Cancel = true;
                    run = false;
                };

                ushort[] depth = new ushort[sp.Width * sp.Height];

                while (run)
                {
                    using (var f = q.WaitForFrame() as VideoFrame)
                    {
                        f.CopyTo(depth);
                    }

                    //var buffer = new char[(640 / 10 + 1) * (480 / 20)];
                    var buffer = new char[(640 / 5 + 1) * (480 / 8)];
                    var coverage = new int[640 / 5];
                    int b = 0;
                    for (int y = 0; y < 480; ++y)
                    {
                        for (int x = 0; x < 640; ++x)
                        {
                            ushort d = depth[x + y * 640];
                            if (d > 0 && d < one_meter) ++coverage[x / 5];
                        }

                        if (y % 8 == 7)
                        {
                            for (int i = 0; i < coverage.Length; i++)
                            {
                                int c = coverage[i];
                                buffer[b++] = " .,:=/nhBXW"[c / 4];
                                coverage[i] = 0;
                            }
                            buffer[b++] = '\n';
                        }
                    }

                    Console.SetCursorPosition(0, 0);
                    Console.WriteLine();
                    Console.Write(buffer);
                    byte[] sending= new byte[buffer.Length];

                    byte[] sending2 = System.Text.Encoding.UTF8.GetBytes("200");
                    sending = buffer.Select(i => (byte)i).ToArray();
                    netStream.Write(sending, 0, sending.Length);

                }
                depthSensor.Stop();
                depthSensor.Close();

            }
        }
    }
}
