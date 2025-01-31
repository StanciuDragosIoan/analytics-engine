module default {
    type Person {
        required name: str;
    }

    type Movie {
        title: str;
        multi actors: Person;
    }

     type Metadata {
    required source: str;
    required device: str;
  }

  type AnalyticsData {
    required event: str;
    required timestamp: datetime;
    required user_id: str;
    required metadata: Metadata;
  }
};
 
