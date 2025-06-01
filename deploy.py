
# /// script
# dependencies = [
#   "pexpect",
# ]
# ///
import pexpect
import json
import re
import os
expo_username = "timblom"
expo_password = os.environ.get("EXPO_PASSWORD")

ios_bundle_identifier = "com.finalquest.yourapp"
ios_username = "christopher@final.quest"
ios_password = os.environ.get("IOS_PASSWORD")

# modify app.json to show correct
# "bundleIdentifier": "com.finalquest.yourapp"

def remove_ansi_sequences(text):
    # This regex matches ANSI escape sequences
    ansi_escape = re.compile(
        r'''
        \x1B  # ESC
        (?:   # 7-bit C1 Fe (except CSI)
            [@-Z\\-_]
        |     # or [ for CSI, followed by a control sequence
            \[
            [0-?]*  # Parameter bytes
            [ -/]*  # Intermediate bytes
            [@-~]   # Final byte
        )
    ''',
        re.VERBOSE
    )
    return ansi_escape.sub('', text)

#pnpm expo login
try:
    pro = pexpect.spawn("pnpm expo login", encoding="utf-8")
    pro.expect("Email or username")
    pro.sendline(expo_username)
    pro.expect("Password")
    pro.sendline(expo_password)
    pro.expect(pexpect.EOF)
except Exception as e:
    print(e)
    # return "Failed to login"

# output = remove_ansi_sequences(pro.before)

# py_files = [line for line in output.splitlines()]
# print(py_files)
# print("Successfully logged in")

#pnpm expo whoami
pro = pexpect.spawn("pnpm expo whoami")
pro.expect(pexpect.EOF)

print("Successfully checked whoami")

# pnpm expo init
pro = pexpect.spawn("pnpm expo init")
pro.expect(pexpect.EOF)

print("Successfully initialized")

# write to eas.json
# {
#   "expo": {
#     "ios": {
#       "bundleIdentifier": "com.yourcompany.yourapp"
#     }
#   }
# }

# find line and delete "packageManager" line from package.json

# # Read package.json
# with open('package.json', 'r') as f:
#     package_data = json.load(f)

# # Remove packageManager field if it exists
# if 'packageManager' in package_data:
#     del package_data['packageManager']

# # Write back to package.json
# with open('package.json', 'w') as f:
#     json.dump(package_data, f)

# # grep for "packageManager" in package.json
# with open('package.json', 'r') as f:
#     for line in f:
#         if 'packageManager' in line:
#             print(line)

# print("Successfully removed packageManager field")

# pro = pexpect.spawn("COREPACK_ENABLE_AUTO_PIN=0 pnpm eas build -p ios")
# # pro.expect("iOS app only uses standard/exempt encryption?")
# # pro.sendline("y")
# pro.expect("Do you want to log in to your Apple account?")
# print("Logging in to Apple account")
# pro.sendline("y")
# pro.expect("Apple ID:")
# pro.sendline(ios_username)
# # pro.expect("Password")
# # pro.sendline(ios_password)
# # try:
# #     pro.expect("Invalid username and password combination.", timeout=25)
# # except Exception as e:
# #     print("Successfully logged in to Apple account")

# try:
#     pro.expect("Generate a new Apple Distribution Certificate?")
#     pro.sendline("y")
# except Exception as e:
#     print(e)
#     print("No new Apple Distribution Certificate needed")

# try:
#     pro.expect("Generate a new Apple Provisioning Profile?")
#     pro.sendline("y")
# except Exception as e:
#     print(e)
#     print("No new Apple Provisioning Profile needed")

# pro.expect(pexpect.EOF)

pro = pexpect.spawn("pnpm eas submit -p ios")
pro.expect("Generate a new App Store Connect API Key")
pro.sendline("y")

# # extract ASC App ID from output

# # extract url from output
# # - When it's done, you can see your build here: https://appstoreconnect.apple.com/apps/6746598976/testflight/ios
# # - https://appstoreconnect.apple.com/apps/6746598976/testflight/ios


# output = remove_ansi_sequences(pro.before)
# remove everything before "When it's done, you can see your build here:"
# output = output.split("When it's done, you can see your build here:")[1]
pro.expect(r"ASC App ID:\s*\d{10}")
asc_app_id = pro.match.group(1)

pro.expect(r"When it's done, you can see your build here:\s*(https://\w+)")
url = pro.match.group(1)

pro.expect(pexpect.EOF)

print(f"ASC App ID: {asc_app_id}")
print(f"Material: {url}")
