import { Card, CardContent, Typography, Button } from "@mui/material";

export default function ProviderCard({ provider, user }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {provider.profession}
        </Typography>

        <Typography>
          {provider.description}
        </Typography>

        {user?.plan === "premium" ? (
          <Typography>📞 {provider.phone}</Typography>
        ) : (
          <Button variant="contained" color="secondary">
            Upgrade to view contact
          </Button>
        )}
      </CardContent>
    </Card>
  );
}