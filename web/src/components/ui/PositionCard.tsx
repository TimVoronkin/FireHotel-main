import { Box, Button, Card } from '@radix-ui/themes';

function PositionCard(props: { title: string; description: string; image: string }) {
  return (
    <Box maxWidth={'250px'}>
      <Card size={'3'} className="">
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            <img src={props.image} alt={props.title} />
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-bold text-red-500">{props.title}</h1>
              <p className="text-pretty text-xl">{props.description}</p>
            </div>
            <div className="text-center">
              <Button size={'2'}>Apply Now</Button>
            </div>
          </div>
        </div>
      </Card>
    </Box>
  );
}

export default PositionCard;
