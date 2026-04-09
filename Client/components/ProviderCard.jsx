import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProviderCard({ provider, user }) {
  const navigate = useNavigate();
//   return (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Typography variant="h6">
//           {provider.profession}
//         </Typography>

//         <Typography>
//           {provider.description}
//         </Typography>

//         {user?.plan === "premium" ? (
//           <Typography>📞 {provider.phone}</Typography>
//         ) : (
//           <Button variant="contained" color="secondary">
//             Upgrade to view contact
//           </Button>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
 return (
    <Card
      sx={{ mb: 2, cursor: "pointer" }}
      onClick={() => navigate(`/provider/${provider._id}`)}
    >
      <CardContent>
        <Typography variant="h6">
          {provider.profession}
        </Typography>

        <Typography>
          {provider.description}
        </Typography>
      </CardContent>
    </Card>
  );
}