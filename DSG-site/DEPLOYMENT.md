# Vercel Deployment Guide

## DNS Configuration

1. Add a CNAME record pointing to `cname.vercel-dns.com`
2. If using an apex domain (e.g., example.com), add these A records:
   - 76.76.21.21
   - 76.76.21.98

## Common Troubleshooting

- If you see `DNS_HOSTNAME_NOT_FOUND`, verify your DNS settings are correct and have propagated
- For `DEPLOYMENT_NOT_FOUND`, check that your project exists and the URL is correct
- If functions are timing out, optimize their performance or increase the timeout in your Vercel project settings