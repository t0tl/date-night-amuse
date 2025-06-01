
# /// script
# dependencies = [
#   "pexpect",
# ]
# ///


import pexpect
import asyncio

async def main():
    pro = pexpect.spawn("pnpm eas submit -p ios")

    try:
        pro.expect("Generate a new App Store Connect API Key", timeout=7)
        pro.sendline("y")
    except Exception as e:
        print(e)
        print("No new App Store Connect API Key needed")

    try:
        pro.expect("What would you like to submit: ", timeout=7)
        pro.sendline("") # select a build from EAS
    except Exception as e:
        print(e)
        print("No build to submit")

    try:
        pro.expect("Provide a build ID to identify a build on EAS")
        pro.sendline("")
        print("abc")
        await asyncio.sleep(3)
        # pro.expect("- ID")    
        pro.sendline("")
    except Exception as e:
        print(e)
        print("No build ID needed")
        # pro.sendline(build_uuid)

    try:
        pro.expect("Apple ID:", timeout=7)
        pro.sendline("")
    except Exception as e:
        print(e)
        print("No Preset Apple ID available")

    try:
        pro.expect("submission in progress")
        print("Submission in progress")
    except Exception as e:
        print(e)
        print("Submission not in progress")

    print("DEPLOYMENT: Waiting for ASC App ID")
    pro.expect(r"ASC App ID:\s*\d{10}", timeout=120)
    asc_app_id = pro.match.group(1)

    print("DEPLOYMENT: Waiting for Testflight URL")
    pro.expect(r"When it's done, you can see your build here:\s*(https://\w+)", timeout=120)
    url = pro.match.group(1)

    pro.expect(pexpect.EOF)

if __name__ == "__main__":
    asyncio.run(main())