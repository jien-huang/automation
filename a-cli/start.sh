#!/usr/bin/env sh

browser=chromium
# Parse the command line and set variables to control logic
parseCommandLine() {
	# Special case that nothing was provided on the command line so print usage
	# - include this if it is desired to print usage by default
	if [ "$#" -eq 0 ]; then
		printUsage
		exit 0
	fi
	# Indicate specification for single character options
	# - 1 colon after an option indicates that an argument is required
	# - 2 colons after an option indicates that an argument is optional, must use -o=argument syntax
	optstring="hu:b:s:i:B::v"
	# Indicate specification for long options
	# - 1 colon after an option indicates that an argument is required
	# - 2 colons after an option indicates that an argument is optional, must use --option=argument syntax

	GETOPT_OUT=`getopt $optstring "$@"`

	exitCode=$?
	if [ $exitCode -ne 0 ]; then
		echo ""
		printUsage
		exit 1
	fi
	# The following constructs the command by concatenating arguments
	# - the $1, $2, etc. variables are set as if typed on the command line
	# - special cases like --option=value and missing optional arguments are generically handled
	#   as separate parameters so shift can be done below
	eval set -- "$GETOPT_OUT"
	# Loop over the options
	# - the error handling will catch cases were argument is missing
	# - shift over the known number of options/arguments
	while true; do
		case "$1" in
			-h) # -h or --help  Print usage
				printUsage
				exit 0
				;;
			-u)
				git_url=$2
				shift 2
				;;
			-b)
				git_branch=$2
        shift 2
        ;;
      -B)
				browser=$2
        shift 2
        ;;
      -s)
				suite=$2
        shift 2
        ;;
      -r)
				result_url=$2
        shift 2
        ;;
      -i)
				id=$2
				mkdir -p $id
        shift 2
        ;;
			-v) # -v or --version  Print the version
				printVersion
				exit 0
				;;
			--) # No more arguments
				shift
				break
				;;
			*) # Unknown option - will never get here because getopt catches up front
				echo ""
				echo "Invalid option $1." >&2
				printUsage
				exit 1
				;;
		esac
	done
	# Get a list of all command line options that do not correspond to dash options.
	# - These are "non-option" arguments.
	# - For example, one or more file or folder names that need to be processed.
	# - If multiple values, they will be delimited by spaces.
	# - Command line * will result in expansion to matching files and folders.
	shift $((OPTIND-1))
	additionalOpts=$*
}

# Print the program usage
# - calling code needs to exit with the appropriate status
printUsage() {
	echo ""
	echo "$program [options] other-vals"
	echo ""
	echo "Download test, run it and upload results."
	echo "Options are:"
	echo ""
	echo "-h                    Print help."
	echo "-u <git repo url>     Specify the git repo url."
	echo "-b <branch name>      Specify the git branch."
	echo "-B [browser]          Specify the web browser: default chromium, optional: firefox."
	echo "-s <entry suite name> Specify the entry test suite name."
	echo "-i <test id>          Specify the id for upload."
	echo "-r <results url>      Specify the results url"
	echo "-v                    Print version."
	echo ""
}

# Use git to get folders
handleGit() {
  #git to get content
  echo "handle Git"
  echo "git url: $git_url"
  echo "git branch: $git_branch"
  echo ""
#  git init
#  git remote add -f origin $git_url
#  git config core.sparsecheckout true
#  echo suites/ >> .git/info/sparse-checkout
#  echo cases/ >> .git/info/sparse-checkout
#  echo ui/ >> .git/info/sparse-checkout
#  echo data/ >> .git/info/sparse-checkout
#  git pull origin $git_branch
}

# Print the program version
# - calling code needs to exit with the appropriate status
printVersion() {
	echo ""
	echo "$program version:  $version $versionDate"
	echo ""
}

startTest() {
  echo "test start ..."
  echo "folder $id, browser: $browser suite: $suite"
  echo ""
  echo "$id $suite"
  echo "test finished"
  echo ""
}

uploadResults() {
  echo "zip the results folder: $id"
  echo ""
  zip $id
  echo "upload to $result_url"
  echo ""
  echo "upload $id"
  curl -F
  echo "upload finished"
  echo ""
}

# Main entry point into shell
program=$(basename $0)
version="1.0.0"
versionDate="2021-05-13"


# Parse the command line options
# - pass all arguments to the function
parseCommandLine "$@"
exitCode=$?
if [ $exitCode == 0 ]; then
  echo ""
  handleGit
  startTest
fi
uploadResults

#start test & upload results

exit 0



