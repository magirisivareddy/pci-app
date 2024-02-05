"use client"
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { usePathname, useRouter } from 'next/navigation';



function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function CustomSeparator() {
  const pathname = usePathname();
  const router = useRouter()

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) {
    event.preventDefault();
    console.info(`You clicked a breadcrumb: ${href}`);
    if (href) router.push(href);
  }
  // Split the pathname into segments and filter out any empty segments
  const pathSegments = pathname.split('/').filter(Boolean);

  // Check if pathSegments is empty, if so, set a default breadcrumb for "Home"
  if (pathSegments.length === 0) {
    pathSegments.push('Home'); // Assuming you want to display "Home" for the root path
  }

  // Generate the breadcrumbs dynamically based on the path segments
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const displayText = capitalizeFirstLetter(segment);
    // If it's the last segment, display it as text; otherwise, display it as a link
    const isLast = index === pathSegments.length - 1;
    return isLast ? (
      <Typography key={index} >
        {displayText}
      </Typography>
    ) : (
      <Link underline="hover" key={index} color="primary" href={href} onClick={(e) => handleClick(e, href)}>
        {displayText}
      </Link>
    );
  });

  return (
    <Stack spacing={2} sx={{marginBottom:'2rem'}}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="medium" color='primary' />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
