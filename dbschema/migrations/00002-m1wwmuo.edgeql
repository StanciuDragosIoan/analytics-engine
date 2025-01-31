CREATE MIGRATION m1wwmuopkp7cf5wlxi2k3kv2bun2hxha2y2xzaebfdesa6wek4neyq
    ONTO m1uwekrn4ni4qs7ul7hfar4xemm5kkxlpswolcoyqj3xdhweomwjrq
{
  CREATE TYPE default::Metadata {
      CREATE REQUIRED PROPERTY device: std::str;
      CREATE REQUIRED PROPERTY source: std::str;
  };
  CREATE TYPE default::AnalyticsData {
      CREATE REQUIRED LINK metadata: default::Metadata;
      CREATE REQUIRED PROPERTY event: std::str;
      CREATE REQUIRED PROPERTY timestamp: std::datetime;
      CREATE REQUIRED PROPERTY user_id: std::str;
  };
};
