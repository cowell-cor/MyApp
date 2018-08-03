@rem = '--*-Perl-*--
@echo off
if "%OS%" == "Windows_NT" goto WinNT
perl -x -S "%0" %1 %2 %3 %4 %5 %6 %7 %8 %9
goto endofperl
:WinNT
perl -x -S %0 %*
if NOT "%COMSPEC%" == "%SystemRoot%\system32\cmd.exe" goto endofperl
if %errorlevel% == 9009 echo You do not have Perl in your PATH.
if errorlevel 1 goto script_failed_so_exit_with_non_zero_val 2>nul
goto endofperl
@rem ';
#!perl -w
#line 15
#<?php exit(1);__halt_compiler();

use strict;
use warnings;

use Cwd;
use Data::Dumper;
use Fcntl qw(O_EXCL O_CREAT O_RDWR O_RDONLY O_WRONLY O_APPEND);
use IO::File;

sub intval($)
{
	my $v = shift;
	if ($v =~ m/(\d+)/m)
	{
		$v = 0 + $1;
	}
	else
	{
		$v = 0;
	}

	return $v;
}

#
# Read the latest SVN revision via the shell "svn up" command
#
sub getLatestSvnRevision()
{
	my $svn_path = 'https://montreal.bluerush.ca:8443/meridian/trunk/meri-001/html5/';
	my $cmd = 'svn up';

	if (!(-d '.svn'))
	{
		$cmd = 'svn info '. $svn_path;
	}

	my $latest_svn = qx($cmd);

	chomp($latest_svn);
	if ($latest_svn =~ m/^\s*(?:(?:At|Last)\s+)?[Rr]evision[\:]?\s+([0-9]+)\s*[\.\n\r]*$/mi)
	{
		#print "[$latest_svn][$1][$&]";
		my $latest_revision = $1;
		return intval($latest_revision);
	}

	return 0;
}

#
# Modify the root REVISION.txt file
#
sub modifyRevisionFile($$)
{
	my $file_path     = shift;
	my $next_revision = shift;

	my $old_data  = '';

	if (-f $file_path)
	{
		my $file_size = (-s $file_path);
		if ($file_size > 0)
		{
			my $fh = IO::File->new($file_path, O_RDWR) or die('Could not open file '. $file_path .': '. $!);
			$fh->sysread($old_data, $file_size);

			if ($old_data =~ m/^\s*Revision:\s*([0-9]+)/mi)
			{
				my $old_revision = intval($1);
				my $new_data     = "Revision: " .$next_revision ."\r\n\r\n";
				my $new_content  = $new_data . $old_data;
				my $new_length   = length($new_content);

				$fh->sysseek(0, 0);

				if ($old_revision == $next_revision)
				{
					print('Already tagged '. $file_path);
					$fh->close();
					return {
						old_revision  => $old_revision,
						next_revision => $next_revision
					};
				}
				else
				{
					$fh->syswrite($new_content);
					my $new_file_size = (-s $file_path);
					if ($new_file_size > $file_size && $new_file_size == $new_length)
					{
					}
					else
					{
						print("Write error\r\n");
					}

					$fh->close();
					return {
						old_revision  => $old_revision,
						next_revision => $next_revision
					};
				}
			}
			else
			{
				print("Header could not be found\r\n");
			}
		}
		else
		{
			print("File is empty\r\n");
		}
	}
	else
	{
		print("File path not found\r\n");
	}

	return {
		old_revision  => $next_revision,
		next_revision => $next_revision
	};
}

#
# Main script entry
#
# 1) Get the latest SVN revision
# 2) Modify the REVISION.txt
# 3) If different then copy changes over the .\webapp\REVISON.txt
# 4) Modify the .\src\app.properties
# 5) Exit
#
sub main()
{
	my $latest_revision = getLatestSvnRevision();
	my $next_revision   = 1 + intval($latest_revision);

	my $orig_path = ".\\export\\REVISION.txt";
	my $obj = modifyRevisionFile($orig_path, $next_revision);

	print qx(svn commit -m "$next_revision" $orig_path);
}

main();
exit();

__END__
:endofperl

@pause
