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

#use SVN::Core;
#use Alien::SVN;
#use SVN::Friendly;

sub generateRedirectIndexHtml(;$)
{
	my $path = shift;

	if (!defined($path) || length($path) < 1) {
		$path = '../';
	}

	if ($path =~ m/^\d+$/) {
		my $p = '';
		my $n = 0 + $path;
		for(my $i = 0; $i < $n; ++$i)
		{
			$p .= '../';
		}

		$path = $p;
	}

	my $HTML_TITLE = '';
	my $HTML_BACK  = 'Back';
	my $INDEX_HTML='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'. "\r\n"
	. '<html xmlns="http://www.w3.org/1999/xhtml"><head>'. "\r\n"
	. '<script type="text/javascript"><!--'. "\r\n"
	. "\t".'window.location.href="'.$path.'";'. "\r\n"
	. '// --></script>'. "\r\n"
	. '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'. "\r\n"
	. '<title>'.$HTML_TITLE.'</title>'. "\r\n"
	. '<meta http-equiv="REFRESH" content="0; url='.$path.'" />'. "\r\n"
	. '</head>'. "\r\n"
	. '<body style="background:#ffffff;" bgcolor="white">'. "\r\n"
	. '<noscript><a href="'.$path.'">'.$HTML_BACK.'</a></noscript>'. "\r\n"
	. '</body>'. "\r\n"
	. '</html>'. "\r\n";

	my $INDEX_JSP='<% response.sendRedirect("'.$path.'"); %>'  . "\r\n";
	my $INDEX_PHP="<?php header('Location: ".$path."'); exit;" . "\r\n";

	# Enforce MS-DOS binmode
	$INDEX_JSP  =~ s/\r*\n/\r\n/gm;
	$INDEX_PHP  =~ s/\r*\n/\r\n/gm;
	$INDEX_HTML =~ s/\r*\n/\r\n/gm;

	#print $INDEX_JSP;
	#print $INDEX_PHP;
	#print $INDEX_HTML;

	my @content = ($INDEX_JSP, $INDEX_PHP, $INDEX_HTML);

	return \@content;
}

sub intval($)
{
	my $v = shift;
	if (!defined($v))
	{
		$v = 0;
	}
	elsif ($v =~ m/(\d+)/m)
	{
		$v = 0 + $1;
	}
	else
	{
		$v = 0;
	}

	return $v;
}

sub fixDirName($)
{
	my $dirname = shift;

	if (!defined($dirname))
	{
		$dirname = './';
	}
	else
	{
		$dirname = Cwd::realpath($dirname) . '/';
		#print "[$dirname]\n";
	}

	return $dirname;
}

sub listRealDirectoryFiles(;$)
{
	my $dirhandle;
	my $dirname  = fixDirName(shift);

	opendir($dirhandle, $dirname) or die("Couldn't open directory '$dirname': $!");
	my @allfiles = readdir($dirhandle);
	closedir($dirhandle);

	return \@allfiles;
}

sub listRealDirectory(;$)
{
	my $dirname     = fixDirName(shift);
	my @allfiles    = @{ listRealDirectoryFiles($dirname) };
	my @directories = grep { !/^\.\.?(svn|cvs|git|bak|settings|project|classpath|tmp)?$/ && -d $dirname.$_ } @allfiles;

	#print Dumper \@directories;

	return \@directories;
}

sub listWantedDirectory(;$)
{
	my $dirname     = fixDirName(shift);

	my @allfiles    = @{ listRealDirectoryFiles($dirname) };
	my @directories = grep { !/^\.\.?(svn|cvs|git|bak|settings|project|classpath|tmp|temp)?$/ && -d $dirname.$_ } @allfiles;
	my @wanted      = grep { /^(app|webapp|webcontent|html5?|vendor|export|asset|com|common|css|js|javascript|script|font|banner|iepngfix|img|image|media|player|skin|config|xml|pdf|as3|swf|smartPlayer|bluePlayer)s?$/i && -d $dirname.$_ } @allfiles;

	#print Dumper \@wanted;

	return \@wanted;
}

sub listRecursiveWantedDirectory($$$;$)
{
	my $dirname     = fixDirName(shift);
	my $level       = intval(shift);
	my $result      = shift;
	my $norestrict  = shift;

	my @allfiles    = @{ listRealDirectoryFiles($dirname) };
	my @directories = grep { !/^\.\.?(svn|cvs|git|bak|settings|project|classpath|tmp|temp)?$/ && -d $dirname.$_ } @allfiles;
	my @wanted      = ();

	if (defined($norestrict) && ($norestrict =~ m/^[1-9true]+$/))
	{
		@wanted     = @directories;
	}
	else
	{
		@wanted     = grep { /^(app|webapp|webcontent|package|html5?|php|jsp|vendor|export|affordabilityCalculator|investmentSelector|lineOfCreditCalculator|mortgagePaymentCalculator|retirementSavingsCalculator|scenario|scenarioReport|scenarioResult|asset|com|common|css|js|json|javascript|script|font|banner|iepngfix|img|image|icon|media|player|skin|config|xml|pdf|as3|swf|smartPlayer|bluePlayer)s?$/i && -d $dirname.$_ } @allfiles;
	}

	for my $dir (@wanted)
	{
		my $full_dir = $dirname . $dir;
		my $next_dir   = $full_dir . '/';
		my $next_level = 1 + $level;
		if ($dir =~ m/^(webapp|webcontent|html5?|php|jsp)s?$/mi)
		{
			#print "N[$next_level][$next_dir]\n";
			&listRecursiveWantedDirectory($next_dir , $next_level, $result);
		}
		elsif ($dir =~ m/^(asset|com|common|css|js|javascript|script|font|img|image|media|player|config|xml|pdf|swf|smartPlayer|bluePlayer)s?$/mi)
		{
			# Take ALL sub-directory whatever the dirname
			#print "A[$next_level][$next_dir]\n";
			push(@{$result}, [$next_dir, $level]);
			&listRecursiveWantedDirectory($next_dir , $next_level, $result, 1);
		}
		else
		{
			#print "C[$level][$full_dir]\n";
			push(@{$result}, [$next_dir, $level]);
			&listRecursiveWantedDirectory($next_dir , $next_level, $result);
		}
	}
}

sub createNewFile($$;$)
{
	my $file_path    = shift;
	my $new_content  = shift;
	my $override     = shift;

	my $valid = 0;

	if (-d $file_path)
	{
		print('Already exist as a directory '. $file_path . "\r\n");
	}
	elsif (-f $file_path)
	{
		my $file_size = (-s $file_path);
		if ($file_size > 0)
		{
			if (intval($override) > 0)
			{
				print('Already exist as a non-empty file and OVERRIDING content '. $file_path . "\r\n");
				$valid = 1;
			}
			else
			{
				print('Already exist as a non-empty file '. $file_path . "\r\n");
			}
		}
		else
		{
			# Empty file exist
			print('Already exist as an empty file '. $file_path . "\r\n");
			$valid = 1;
		}
	}
	elsif (-e $file_path)
	{
		print('Already exist but it is not a file '. $file_path . "\r\n");
	}
	else
	{
		# Does not exist
		print('Does not exist as an empty file '. $file_path . "\r\n");
		$valid = 2;
	}

	my $new_length = length($new_content);
	if ($valid && $new_length > 0)
	{
		my $mode = ($valid > 1) ? (O_RDWR | O_CREAT) : (O_RDWR | O_EXCL);
		my $fh = IO::File->new($file_path, $mode) or die('Could not open file '. $file_path .': '. $! . "\r\n");
		$fh->sysseek(0, 0);
		$fh->truncate(0);
		$fh->binmode(":raw:crlf");
		$fh->syswrite($new_content);
		my $new_file_size = (-s $file_path);
		if ($new_file_size > 0 && $new_file_size == $new_length)
		{
			# Written as expected
			#print("Written as expected\r\n");
		}
		else
		{
			print("Write error\r\n");
		}

		$fh->close();
	}

	return $valid;
}

sub createIndexFile($$$;$)
{
	my $dirname      = fixDirName(shift);
	my $level        = intval(shift);
	my $contentref   = shift;
	my $override     = shift;

	my ($INDEX_JSP, $INDEX_PHP, $INDEX_HTML) = @{ $contentref };

	#createNewFile($dirname . 'index.jsp',  $INDEX_JSP,  $override);
	createNewFile($dirname . 'index.php',  $INDEX_PHP,  $override);
	createNewFile($dirname . 'index.html', $INDEX_HTML, $override);
}

sub main($$;$)
{
	my $base_dirname = fixDirName(shift);
	my $base_level   = intval(shift);
	my $override     = shift;
	my @results      = ();

	listRecursiveWantedDirectory($base_dirname, $base_level, \@results);

	print Dumper \@results;

	my @contentfiles = ();
	foreach my $item (@results)
	{
		my ($dirname, $level) = @{$item};

		# Generate redirect content HTML on demand
		if (!defined($contentfiles[$level]))
		{
			$contentfiles[$level] = generateRedirectIndexHtml($level);
		}

		if ($dirname =~ m|[\/\\]+export[\/\\]?$|m)
		{
			print "SKIP [$dirname]\n";
			next;
		}

		createIndexFile($dirname, $level, $contentfiles[$level], $override);
	}
}

my $override = 1;
main('.', 0, $override);
exit;

__END__
:endofperl

@pause
