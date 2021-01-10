import React from 'react';
import { Card, CardContent, Typography} from '@material-ui/core'

function InfoBox( {title, cases, total}) {
    return (
        <Card className="infoBox">
           <CardContent>
                {/* Tile */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                {/* Number of cases in k*/}
                <h2 className="infoBox__cases">
                    {cases}
                </h2>

                {/* Total cases in M*/}
                <Typography class="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
           </CardContent>
       </Card>
    )
}

export default InfoBox